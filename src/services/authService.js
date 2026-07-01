export const registrar = async (datos) => {
    const res = await fetch("http://proyapi802.somee.com/api/Auth/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    console.log("STATUS:", res.status);

    return await res.json();
};