/*
const httpReponse: HttpResponse = {
  statusCode: 201,
  body: {
    name: response.value.name,
    email: response.value.email
  }
}

return httpReponse
*/

import { HttpResponse } from '@/web-controllers/ports'

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
