const express = require("express");
const routes = require("./Routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/* 
 - Metodos HTTP
 GET: Para realizar um requisição ao back-end
 POST: Para enviar informações ao back-end
 PUT: Para enviar alterações de forma completa para o back-end
 PATCH: Para enviar alterações espesificas para o back-end
 DELETE: Para deletar aogo do back-end
*/

/* 
 - Tipos de parametros
Query Params: Parametros nomeados enviado na rota após a "?" geralmnte usado para (Filtros e paginação)
Route Params: Parametros utilizados para identificar recursos
Req Body: Corpo da request utilizado para criar ou alterar recursos
*/

app.listen(3333);
