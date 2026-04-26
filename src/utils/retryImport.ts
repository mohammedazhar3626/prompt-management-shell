export const retryImport = (fn: any, retries = 3): Promise<any> =>
    fn().catch((err: any) => {
        if (retries === 0) throw err
        return retryImport(fn, retries - 1)
    })
