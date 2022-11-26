import IUser from '../../interfaces/IUser'

const userMock: IUser = {
  id: 1,
  userName: 'admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const payloadMock = {
  id: 1,
  role: 'admin',
}

const tokenMock: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc'

const validLoginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const invalidEmailMock = {
  email: 'test@test.com',
  password: 'secret_admin'
}

const invalidPasswordMock = {
  email: 'admin@admin.com',
  password: 'qualquer_coisa'
}

export {
  userMock,
  tokenMock,
  validLoginMock,
  invalidEmailMock,
  invalidPasswordMock,
  payloadMock,
}