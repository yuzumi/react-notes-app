import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Note from '../../models/Note';
import { addNote } from '../../actions';
import ColorPalette from '../../containers/ColorPalette/ColorPalette';
import styles from './NoteEditor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            color: ''
        };
    }

    static getColorDefaultValue() {
        return 'grey';
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { text, color } = this.state;

        if (text.trim().length) {
            const note = Note.of(text, color || NoteEditor.getColorDefaultValue());
            this.props.addNote(note);
        }
    }

    render() {
        const { text } = this.state;

        return (
            <form className={styles.root} onSubmit={this.handleSubmit}>
                <textarea 
                    className={styles.text} 
                    placeholder="Enter your note here..."
                    name="text"
                    value={text}
                    onChange={this.handleChange}>
                </textarea>
                <div className={styles.control}>
                    <ColorPalette handleSelect={this.handleChange} />
                    <button className="button-reset" type="submit">
                        <FontAwesomeIcon className="icon" icon="plus" size="sm" />
                    </button>
                </div>
            </form>
        );
    }
}

NoteEditor.propTypes = {
    addNote: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    addNote: (note) => dispatch(addNote(note))
});

export default connect(
    null,
    mapDispatchToProps    
)(NoteEditor);