import React from 'react'
import { Router, navigate } from '@reach/router'
import { Grid, Form, Button, Label } from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { useCreateUser } from 'src/hooks'

const Login = () => {
	const [createUser, { loading: creating }] = useCreateUser()
	const { control, handleSubmit, errors } = useForm()

	const login = async ({ userId }) =>
		await createUser({ userId }).then((user) => navigate(user.id))

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Form onSubmit={handleSubmit(login)}>
					<Form.Group>
						<Controller
							as={<Form.Input />}
							rules={{ required: true }}
							name="userId"
							control={control}
							defaultValue={''}
						/>
						<Button
							loading={creating}
							disabled={creating}
							compact
							type="submit"
						>
							Log In
						</Button>
						{errors.userId && (
							<Label basic color="red" pointing="left">
								<span>This field is required</span>
							</Label>
						)}
					</Form.Group>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

const User = ({ userId }) => {
	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<p>{userId}</p>
			</Grid.Column>
		</Grid>
	)
}

const App = () => {
	return (
		<Router>
			<Login default path="/*" />
			<User path="/:userId" />
		</Router>
	)
}

export default App
