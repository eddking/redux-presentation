
// Add hot module reloading
declare interface NodeModule {
    hot?: { accept: (path?: string, callback?: () => void) => void };
}
