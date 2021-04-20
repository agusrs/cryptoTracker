class Http {
    static instance = new Http();

    get = async (url) => {
        try {
            let req = await fetch(url);

            let json = await req.json()

            return json
        } catch (error) {
            console.log("http get method", error)
        }
    }

    post = async (url) => {
        try {
            let req = await fetch(url, {
                method: "POST",
                body
            });

            let json = await req.json()

            return json
        } catch (error) {
            console.log("http post method", error)
        }
    }

    put = async (url) => {
        try {
            let req = await fetch(url, {
                method: "PUT",
                body
            });

            let json = await req.json()

            return json
        } catch (error) {
            console.log("http put method", error)
        }
    }

    remove = async (url) => {
        try {
            let req = await fetch(url, {
                method: "DELETE",
                body
            });

            let json = await req.json()

            return json
        } catch (error) {
            console.log("http delete method", error)
        }
    }
}

export default Http