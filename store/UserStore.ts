import {defineStore} from "pinia";
import {UserAuthData} from "~/model/Interfaces";
import {useGlobalStore} from "~/store/GlobalStore";
export const useUserStore = defineStore('user', () => {
    const EMPTY_USER = {
        avatar: "",
        created: "",
        email: "",
        emailVisibility: "",
        id: "",
        updated: "",
        username: "",
        verified: false,
        isNew: false,
    }
    const loggedIn = ref(false);
    const userToken = ref('')
    const userDetails = ref({...EMPTY_USER});
    function setUserDetails(authData: UserAuthData) {
        userDetails.value = { ...authData }
    }
    function setUserToken(token: string) {
        userToken.value = token;
    }
    function login(authData: UserAuthData,token: string) {
        setUserDetails(authData);
        setUserToken(token);
        loggedIn.value=true;
    }
    function resetState() {
        loggedIn.value = false;
        userToken.value = '';
        userDetails.value = { ...EMPTY_USER };
        document.cookie = 'tt-user' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    function logout() {
        resetState();
        useGlobalStore().resetState();
    }
    return {
        login,
        userToken,
        userDetails,
        setUserDetails,
        setUserToken,
        loggedIn,
        logout
    }
}, {
    persist: {
        key: "tt-user",
    }
},)