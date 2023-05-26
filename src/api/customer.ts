import { instance } from "./base.api"

const endpoint = "cliente";

export const customer = {
    getAll:function(){
        return instance.get(endpoint);
    }
}