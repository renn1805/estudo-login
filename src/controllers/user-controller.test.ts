import { after, before, describe, it, mock } from "node:test";
import { prisma } from "../app";
import { userController } from "./user-controller";
import * as z from 'zod'
import assert from "node:assert";


describe('UserController tests', () => {

    describe('User create tests', () => {

        it('Given_ValidUserData_When_RegisterIsCalled_Then_ReturnStatusCreatedAndSavedUser', async () => {
            const mockUser = {
                id: 1,
                firstName: 'mock name',
                lastName: 'mock last name',
                email: 'mock@gmail.com',
                password: 'mock password'
            }
            mock.method(prisma.user, 'create', async () => mockUser)

            const mockRequest = {
                body: mockUser
            } as any

            let statusCodeResponse: number = 0;
            let jsonResponse: any;
            const mockResponse = {
                status (code: number) {
                    statusCodeResponse = code
                    return this
                },
                json (data: any) {
                    jsonResponse = data
                    return this
                }
            } as any

            const response = await userController.create(mockRequest, mockResponse)

            const resSchema = z.object({
                id: z.literal(mockUser.id),
                firstName: z.literal(mockUser.firstName),
                lastName: z.literal(mockUser.lastName),
                email: z.literal(mockUser.email)
            }).strict()

            const user = resSchema.safeParse(jsonResponse)

            if (!user.success) {
                console.debug('User not created. Error:', user.error.format())
            }
            assert.ok(user.success)
            assert.strictEqual(statusCodeResponse, 201)

            mock.reset()
        })


        it('')

    })


})