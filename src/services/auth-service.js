import axios from 'axios'


class AuthService {
    login(user) {
        return axios.post('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/users/signin', {
                id: user.id,
                password: user.password
            })
            .then(this.handleResponse)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(user) {
        return axios.post('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/users', {
            name: user.name,
            id: user.id,
            password: user.password,
            phonenumber: user.phonenumber
        })

        .then(function(response) {
            console.log(response);
            console.log("submit");
        });

    }

    handleResponse(response) {
        if (response.status === 401) {
            this.logout()
            location.reload(true)

            const error = response.data && response.data.message
            return Promise.reject(error)
        }

        return Promise.resolve(response)
    }
}

export default new AuthService()