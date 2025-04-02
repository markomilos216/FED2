export class User{
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email: string,
        public phone: string,
        public role: string,
        private _token: string,
        private _expiresIn: Date
    ){}
    get token(): string | null{
        if(!this._expiresIn || this._expiresIn < new Date()){
            return null
        }
        return this.token
    }
}