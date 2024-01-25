import find from 'find-process'
import prompts from 'prompts' // <-- not compatible


(async () => {
    const port = await prompts({
        type: 'number',
        name: 'value',
        message: 'port?',
        validate: (value: number) => (value < 0 || value > 65535 ? `out of port range` : true)
    })

    find('port', port.value).then(
        (list: any) => {
            console.log(list)
        },
        (err: { stack: any }) => {
            console.log(err.stack || err)
        }
    )
})()
