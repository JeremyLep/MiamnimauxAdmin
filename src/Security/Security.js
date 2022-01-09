export const setLoginCookies = (data) => {
    const d = new Date();
    let tokens = data.token.split('.');
    let roles = data.roles;
    let name = data.name ? data.name : 'Test';

    d.setTime(d.getTime() + (7*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie =  "lk_adm_auth_1=" + tokens[0] + "." + tokens[1] + ";" + expires + ";path=/";
    document.cookie =  "lk_adm_auth_2=" + tokens[2] + ";" + expires + ";path=/";
    document.cookie =  "lk_adm_roles=" + roles + ";" + expires + ";path=/";
    document.cookie =  "lk_adm_name=" + name + ";" + expires + ";path=/";

    return true;
}

export const isGranted = (roles) => {
    const token = getToken();

    if (roles.length > 0 && (token === null || Array.isArray(token.roles) === false)) {
        return false;
    }

    return roles.every(role => token.roles.includes(role));
}

export const getToken = () => {
    let token1 = document.cookie.match(new RegExp('(^| )lk_adm_auth_1=([^;]+)'));
    let token2 = document.cookie.match(new RegExp('(^| )lk_adm_auth_2=([^;]+)'));
    let roles  = document.cookie.match(new RegExp('(^| )lk_adm_roles=([^;]+)'));
    let name   = document.cookie.match(new RegExp('(^| )lk_adm_name=([^;]+)'));

    if (token1 && token2 && token1[2] !== 'undefined' && token2[2] !== 'undefined') {
        return {
            token: token1[2] + '.' + token2[2],
            roles: roles[2],
            name: name[2] !== 'undefined' ? name[2] : 'Test'
        };
    } else {
        return false;
    }
}

export const Logout = () => {
    document.cookie = 'lk_adm_auth_1=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'lk_adm_auth_2=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'lk_adm_roles=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'lk_adm_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT';

    return true;
}