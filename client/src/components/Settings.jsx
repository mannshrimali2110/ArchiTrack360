// src/components/Settings.js
import { useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';

const Settings = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        profileVisibility: 'public',
        password: '',
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveSettings = () => {
        if (settings.password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        console.log('Settings saved:', settings);
        // Save settings to the database or local storage here
        alert('Settings have been successfully saved.');
    };

    return (
        <Container className="mt-4">
            <h3>Settings</h3>



            {/* Profile Settings */}
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Profile Settings</Card.Title>
                    <Form.Group controlId="profileVisibility">
                        <Form.Label>Profile Visibility</Form.Label>
                        <Form.Control
                            as="select"
                            name="profileVisibility"
                            value={settings.profileVisibility}
                            onChange={handleChange}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="friends">Friends Only</option>
                        </Form.Control>
                    </Form.Group>
                </Card.Body>
            </Card>

            {/* Notifications */}
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Notifications</Card.Title>
                    <Form.Check
                        type="checkbox"
                        id="notifications"
                        label="Enable Email Notifications"
                        name="notifications"
                        checked={settings.notifications}
                        onChange={handleChange}
                    />
                </Card.Body>
            </Card>

            {/* Change Password */}
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Change Password</Card.Title>
                    <Form.Group controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            name="password"
                            value={settings.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Card.Body>
            </Card>

            {/* Save Button */}
            <Button variant="primary" onClick={handleSaveSettings}>
                Save Settings
            </Button>
        </Container>
    );
};

export default Settings;
