declare const module: any
export const setupHMRReload = () => {
    try {
        const mod = (module as any)

        if (mod?.hot) {
            mod.hot.accept(() => {
                window.location.reload()
            })
        }
    } catch (e) {
        // ignore
    }
}