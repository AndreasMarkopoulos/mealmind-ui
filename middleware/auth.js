import {useUserStore} from "~/store/UserStore";

export default function ({redirect}) {
    const userStore = useUserStore();
    if(!userStore.loggedIn) {
        return redirect('/login')
    }
}