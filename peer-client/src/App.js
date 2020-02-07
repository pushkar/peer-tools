import React from 'react'
// import { Router } from '@reach/router'
import { Grid, Form, Button, Label } from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { useCreateUser } from 'src/hooks'

const User = (userId) => {
	return <p>{userId}</p>
}

const App = () => {
	const [createUser, { loading: creating }] = useCreateUser()
	const { control, handleSubmit, errors } = useForm()

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Form onSubmit={handleSubmit(createUser)}>
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

export default App
