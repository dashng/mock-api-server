class FormatRes {
    constructor(...data) {
        [this.success, this.message, this.data] = data;
    }

    to_json() {
        return {
            meta: {
                success: this.success,
                message: this.message

            },
            data: this.data
        }
    }

}

module.exports = FormatRes;