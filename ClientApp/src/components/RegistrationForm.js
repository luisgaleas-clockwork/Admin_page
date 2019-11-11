import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { USERS_API_URL } from '../constants';

class RegistrationForm extends React.Component {
    state = {
        id: 0,
        name_: '',
        email: '',
        phone: '',
        actions: ''
    }
    componentDidMount() {
        if (this.props.user) {
            const { id, name_, email, phone, actions } = this.props.user
            this.setState({ id, name_, email, phone, actions});
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name_: this.state.name_,
                email: this.state.email,
                phone: this.state.phone,
                actions: this.state.actions
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.addUserToState(user);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                name_: this.state.name_,
                email: this.state.email,
                phone: this.state.phone,
                actions: this.state.actions
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="name_">Name:</Label>
                <Input type="text" name="name_" onChange={this.onChange} value={this.state.name_ === '' ? '' : this.state.name_} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input type="text" name="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} />
            </FormGroup>
            <FormGroup>
                <Label for="phone">Phone:</Label>
                <Input type="text" name="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone} 
                placeholder="123-456-7890" />
            </FormGroup>
            <FormGroup>
                <Label for="actions">Position:</Label>
                <Input type="text" name="actions" onChange={this.onChange} value={this.state.actions === null ? '' : this.state.actions} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default RegistrationForm;