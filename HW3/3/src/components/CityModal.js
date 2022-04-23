import React from 'react';

import './CityModal.css';


class CityModal extends React.Component {

    render() {
        const {
            city,
            isOpen,
            onClose,
        } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <div onClick={onClose} className="dimmer">
                <div className="modal-container">
                    <h1>{city.name}</h1>
                    <ul>
                        <li>مرکز استان: {city.center}</li>
                        <li>سال تاسیس: {city.established_year}</li>
                        <li>مساحت: {city.area}</li>
                        <li>جمعیت: {city.population}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default CityModal;
