import React from 'react';
import FormDate from '../form-date/form-date.component';
import FormInput from '../form-input/form-input.component';
import FormInputNumber from '../form-input-number/form-input-number.component';
import MeetingTypeSelect from '../mtg-type-select/mtg-type-select.component';
import MeetingObjective from '../meeting-objective/meeting-objective.component';
import MeetingPeople from '../meeting-people/meeting-people.component';

import './meeting-form.styles.scss';
class MeetingForm extends React.Component {
    constructor() {
        super();

        this.state = {
            mtg_title: '',
            mtg_date: '2021-01-11',
            mtg_facilitator: '',
            mtg_type: 'Lesson',
            mtg_teacher: '',
            mtg_speaker: '',
            mtg_worship: '',
            mtg_attendance: 0,
            mtg_newcomers: 0,
            mtg_av: '',
        };
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleNumericClick = (event) => {
        // this is used to increment or decrement int
        const { name } = event.target;
        console.log('component: ' + name);
    }
    render() {
        const testString = '2021-01-11';
        return (
            <div className='mtg-page'>
                <form className='meeting-form'>
                    <div className='title-block'>
                        <h2>Meeting</h2>
                    </div>
                    <FormDate
                        // className='form-date'
                        name='mtg_date'
                        value={this.state.mtg_date}
                        onChange={this.handleChange}
                        label='Meeting Date'
                    />
                    <FormInput
                        // className='facilitator-input'
                        type='text'
                        name='mtg_title'
                        value={this.state.mtg_title}
                        onChange={this.handleChange}
                        label='Meeting Title'
                        required
                    />
                    <FormInput
                        // className='facilitator-input'
                        type='text'
                        name='mtg_facilitator'
                        value={this.state.mtg_facilitator}
                        onChange={this.handleChange}
                        label='Facilitator'
                        required
                    />
                    <MeetingTypeSelect
                        name='mtg_type'
                        value={this.state.mtg_type}
                        onChange={this.handleChange}
                        label='Meeting Type'
                    />
                    {this.state.mtg_type === 'Lesson' ? (
                        <FormInput
                            className='teacher-input'
                            type='text'
                            name='mtg_teacher'
                            value={this.state.mtg_teacher}
                            onChange={this.handleChange}
                            label="Who's teaching?"
                            required
                        />
                    ) : null}
                    {this.state.mtg_type === 'Testimony' ? (
                        <FormInput
                            // className='facilitator-input'
                            type='text'
                            name='mtg_speaker'
                            value={this.state.mtg_speaker}
                            onChange={this.handleChange}
                            label="Who's Testimony?"
                            required
                        />
                    ) : null}
                    <FormInput
                        // className='facilitator-input'
                        type='text'
                        name='mtg_worship'
                        value={this.state.mtg_worship}
                        onChange={this.handleChange}
                        label='Worship...'
                        required
                    />
                    <FormInputNumber
                        type='number'
                        name='mtg_attendance'
                        value={this.state.mtg_attendance}
                        onChange={this.handleNumericClick}
                        min='0'
                        max='300'
                        label='Attendance'
                    />

                    <hr className='form-divider' />
                    <MeetingPeople
                        className='mtg-av'
                        name='mtg_av'
                        value={this.state.mtg_av}
                        onChange={this.handleChange}
                        label='Audio Visual'
                    />
                </form>
            </div>
        );
    }
}
export default MeetingForm;
