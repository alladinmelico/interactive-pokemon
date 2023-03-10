import { app, server } from '../server'
import request from 'supertest'
import { PostInstance } from '../post/PostModel'
import { v4 as uuidv4 } from 'uuid'
import { generateAccessToken } from '../utils/jwt.utils'
import { faker } from '@faker-js/faker'
import { UserModel } from '../user/UserModel'

const postPayload = {
  title: faker.lorem.text(),
  description: faker.lorem.sentence(),
}

const userPayload = () => ({
  id: uuidv4(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  password: faker.random.alphaNumeric(),
})

interface IUserResponse {
  id: string
  name: string
  email: string
}

interface IPostResponse {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  User: IUserResponse
}

describe('PostController', () => {
  afterAll(async () => {
    await server.close()
  })

  describe('GET /api/posts', () => {
    it('should return list of posts', async () => {
      const { body, statusCode } = await request(app).get('/api/posts')

      expect(statusCode).toBe(200)

      expect(body).toEqual({
        data: expect.any(Array<IPostResponse>),
        message: 'Posts successfully retrieved.',
      })
    })
  })

  describe('GET /api/posts/:id', () => {
    describe('given the post is not existing', () => {
      it('should return a 404', async () => {
        const { statusCode } = await request(app).get(`/api/posts/${uuidv4()}`)

        expect(statusCode).toBe(404)
      })
    })
    describe('given the post is existing', () => {
      it('should return a 200', async () => {
        const userCreated = await UserModel.create(userPayload())

        const createdPost = await PostInstance.create({
          ...postPayload,
          id: uuidv4(),
          UserId: userCreated.dataValues.id,
        })

        const { body, statusCode } = await request(app).get(
          `/api/posts/${createdPost.dataValues.id}`
        )

        expect(statusCode).toBe(200)

        expect(body).toEqual({
          data: {
            ...postPayload,
            id: createdPost.dataValues.id,
            UserId: userCreated.dataValues.id,
            User: expect.any(Object),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          message: 'Post successfully retrieved.',
        })
      })
    })
  })

  describe('POST /api/posts', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401', async () => {
        const { statusCode } = await request(app).post('/api/posts')

        expect(statusCode).toBe(401)
      })
    })
    describe('given the user is logged in', () => {
      it('should return a 200 and create the post', async () => {
        const userCreated = await UserModel.create(userPayload())

        const jwt = generateAccessToken({ email: userCreated.dataValues.email })

        const { statusCode, body } = await request(app)
          .post('/api/posts')
          .set('Authorization', `Bearer ${jwt}`)
          .send(postPayload)

        expect(statusCode).toBe(200)

        expect(body).toEqual({
          data: {
            ...postPayload,
            id: expect.any(String),
            UserId: userCreated.dataValues.id,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          message: 'Post successfully created.',
        })
      })
    })
  })

  describe('PUT /api/posts:id', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401', async () => {
        const userCreated = await UserModel.create(userPayload())

        const createdPost = await PostInstance.create({
          ...postPayload,
          id: uuidv4(),
          UserId: userCreated.dataValues.id,
        })

        const { statusCode } = await request(app).put(
          `/api/posts/${createdPost.dataValues.id}`
        )

        expect(statusCode).toBe(401)
      })
    })
    describe('given the post is not existing', () => {
      it('should return a 404', async () => {
        const userCreated = await UserModel.create(userPayload())

        const jwt = generateAccessToken({ email: userCreated.dataValues.email })

        const { statusCode } = await request(app)
          .put(`/api/posts/${uuidv4()}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(postPayload)

        expect(statusCode).toBe(404)
      })
    })
    describe('given the user is logged in', () => {
      it('should return a 200 and update the post', async () => {
        const userCreated = await UserModel.create(userPayload())
        const jwt = generateAccessToken({ email: userCreated.dataValues.email })

        const createdPost = await PostInstance.create({
          ...postPayload,
          id: uuidv4(),
          UserId: userCreated.dataValues.id,
        })

        const { statusCode, body } = await request(app)
          .put(`/api/posts/${createdPost.dataValues.id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(postPayload)

        expect(statusCode).toBe(200)

        expect(body).toEqual({
          data: {
            ...postPayload,
            id: createdPost.dataValues.id,
            UserId: userCreated.dataValues.id,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          message: 'Post successfully updated.',
        })
      })
    })
  })

  describe('DELETE /api/posts/:id', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401', async () => {
        const userCreated = await UserModel.create(userPayload())

        const createdPost = await PostInstance.create({
          ...postPayload,
          id: uuidv4(),
          UserId: userCreated.dataValues.id,
        })
        const { statusCode } = await request(app).delete(
          `/api/posts/${createdPost.dataValues.id}`
        )

        expect(statusCode).toBe(401)
      })
    })
    describe('given the post is not existing', () => {
      it('should return a 404', async () => {
        const createdUser = await UserModel.create(userPayload())

        const jwt = generateAccessToken({ email: createdUser.dataValues.email })
        const { statusCode } = await request(app)
          .delete(`/api/posts/${uuidv4()}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(postPayload)

        expect(statusCode).toBe(404)
      })
    })
    describe('given the user is logged in', () => {
      it('should return a 200 and delete the post', async () => {
        const userCreated = await UserModel.create(userPayload())
        const jwt = generateAccessToken({ email: userCreated.dataValues.email })

        const createdPost = await PostInstance.create({
          ...postPayload,
          id: uuidv4(),
          UserId: userCreated.dataValues.id,
        })

        const { statusCode, body } = await request(app)
          .delete(`/api/posts/${createdPost.dataValues.id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(postPayload)

        expect(statusCode).toBe(200)

        expect(body).toEqual({
          message: 'Post successfully deleted.',
        })
      })
    })
  })
})
