

class Validator {
    constructor(form, rules) {
        this._errors = {};
        this.form = form;
        this.rules = rules; // {email: required|email}
    }

    check () {
        for(let field in this.rules) {
            if(this.form[field] !== undefined) {
                console.log('found in form : ', field);
                this.applyRules(field);
            }
        }
        console.log(this.errors);
        return Object.keys(this._errors).length === 0;
    }

    applyRules(field) {
        const value = this.form[field];
        const rules = this.rules[field];
        const rulesArray = rules.split('|');
        console.log(rulesArray);
        rulesArray.map(type => this.validations(type, field));

    }

    addError(field, message) {
        if(this._errors[field]) {
            this._errors[field].push(message)
        } else {
            this._errors[field] = [message];
        }
    }

    validations(type, field) {
        switch(type) {
            case 'required':
                if(this.form[field] === '') this.addError(field, 'This field is required'); break;
            case 'email':
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if( ! re.test(String(this.form[field]).toLowerCase())) this.addError(field, 'This should be a valid email'); break;
            case 'number':
                if(isNaN(this.form[field])) this.addError(field, 'This should be a number'); break;
            
        }
    }

    get errors() {
        return this._errors;
    }

}

/**
const form = {
    email: '',
    name: '',
    id: 12
};

const rules = {
    email: "required|email",
    name: "required",
    id: "required|number"
};

const v = new Validator(form, rules);
v.check();
 */

 export default Validator; 