const baseUrl = process.env.REACT_APP_API_URL;



export const fetchSinToken = async (endpoint, data, method = "GET") => {

    const url = `${baseUrl}/${endpoint}`
    if (method === 'GET') {
        const resp = await fetch(url)
        return await resp.json()
    } else {

        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await resp.json()

    }
}


export const fetchConToken = async (endpoint, data, method = "GET") => {

    const url = `${baseUrl}/${endpoint}`
    if (method === 'GET') {
        const resp = await fetch(url, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
        return await resp.json()
    } else {

        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': localStorage.getItem('token')
            },
            body: data
        })

        return await resp.json()

    }
}