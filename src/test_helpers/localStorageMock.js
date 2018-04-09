export const getLocalStorageMock = () => {
    const mock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
    }

    global.localStorage = mock
    return mock
}