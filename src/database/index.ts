type ConnectHook = () => void

export const connect = (hook: ConnectHook) => {
    hook();
}