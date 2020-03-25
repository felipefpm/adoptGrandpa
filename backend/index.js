const express = require('express');
const app = express()

app.get('/', (request, response) => {
    return response.json({
        Event: 'SemanaOministack 11',
        Aluno: 'Felipe Pinto'
    })
})
app.listen(3333)