const {GoogleAuth} = require('google-auth-library');

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
async function main() {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    console.log("=====> client: ", client);
    console.log("=====> credentials: ", client.credentials);
    // const projectId = await auth.getProjectId();
    // console.log("=====> projectId: ", projectId);
    // const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
    // const res = await client.request({ url });
    // console.log(JSON.stringify(res.data, null, 2));
}

main().catch(console.error);


// 1//0enRhc-8mk6G8CgYIARAAGA4SNwF-L9IrEOYAAcw7kRL5fHjiWLwGP-o0aaICWJOKm84dGINRDqAn9si5yXKyujkddh3Dpd0vDpA
// 1//0enRhc-8mk6G8CgYIARAAGA4SNwF-L9IrEOYAAcw7kRL5fHjiWLwGP-o0aaICWJOKm84dGINRDqAn9si5yXKyujkddh3Dpd0vDpA