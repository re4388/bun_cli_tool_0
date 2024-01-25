#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char path[256];

    // Read the input path from stdin
    if (fgets(path, sizeof(path), stdin) != NULL) {
        // Remove the newline character from the path
        size_t path_len = strlen(path);
        if (path_len > 0 && path[path_len - 1] == '\n') {
            path[path_len - 1] = '\0';
        }

        // Create the command to run the bun program
        char command[256];
        snprintf(command, sizeof(command), "bun %s", path);

        // Create pipes for stdin and stdout
        int stdin_pipe[2];
        int stdout_pipe[2];

        if (pipe(stdin_pipe) == -1 || pipe(stdout_pipe) == -1) {
            fprintf(stderr, "Failed to create pipes.\n");
            return 1;
        }

        // Fork the process
        pid_t pid = fork();

        if (pid == -1) {
            fprintf(stderr, "Failed to fork the process.\n");
            return 1;
        } else if (pid == 0) {
            // Child process

            // Redirect stdin to the read end of the stdin pipe
            close(stdin_pipe[1]);
            dup2(stdin_pipe[0], STDIN_FILENO);

            // Redirect stdout to the write end of the stdout pipe
            close(stdout_pipe[0]);
            dup2(stdout_pipe[1], STDOUT_FILENO);

            // Close unused pipe ends
            close(stdin_pipe[0]);
            close(stdout_pipe[1]);

            // Execute the bun program
            execlp("bun", "bun", path, NULL);

            // If execlp returns, there was an error
            fprintf(stderr, "Failed to execute the bun program.\n");
            exit(1);
        } else {
            // Parent process

            // Close unused pipe ends
            close(stdin_pipe[0]);
            close(stdout_pipe[1]);

            // Read input from stdin and pass it to the bun program
            char buffer[256];
            ssize_t bytesRead;

            while ((bytesRead = read(STDIN_FILENO, buffer, sizeof(buffer))) > 0) {
                write(stdin_pipe[1], buffer, bytesRead);
            }

            // Close the write end of the stdin pipe
            close(stdin_pipe[1]);

            // Read output from the bun program and print it to stdout
            while ((bytesRead = read(stdout_pipe[0], buffer, sizeof(buffer))) > 0) {
                write(STDOUT_FILENO, buffer, bytesRead);
            }

            // Close the read end of the stdout pipe
            close(stdout_pipe[0]);

            // Wait for the child process to finish
            int status;
            waitpid(pid, &status, 0);
        }
    }

    return 0;
}
