const isUUID = ( uuid:string ) => {
    let s = "" + uuid;

    const result = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    return result !== null;

}

export {
    isUUID
}