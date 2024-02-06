// @ts-ignore
import cliMd from 'cli-markdown'

const mdContent = `

# A first-level heading
## A second-level heading
### A third-level heading


> Text that is a quote

Some basic Git commands are:
\`\`\`
git status
git add
git commit
\`\`\`



- George Washington
* John Adams
+ Thomas Jefferson


1. First list item
   - First nested list item
     - Second nested list item
     
- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada: 
 

@octocat :+1: This PR looks great - it's ready to merge! :shipit:



Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.
  
  


`

console.log(cliMd(mdContent))
