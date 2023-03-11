import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', () => {
    const loading = ref(0);
    function startLoading() {
        loading.value += 1;
    }

    function stopLoading() {
        loading.value -= 1;
    }

    function resetState() {
        loading.value = 0;
        document.cookie = 'tt-global' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    function callFunctionWithLoading<T>(promise: Promise<T>): Promise<T> {
        startLoading();
        return promise.finally(() => stopLoading());
    }

    return {
        loading,
        startLoading,
        stopLoading,
        resetState,
        callFunctionWithLoading
    }
},{
    persist: {
        key: "tt-global",
    },
})