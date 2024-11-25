import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function Recipe() {
    const location = useLocation();
    const { recipe } = location.state || { recipe: '' };

    // Split the recipe text into sentences
    const sentences = recipe.split(/(?<!\d)\.(?!\d)/g).filter((sentence) => sentence.trim() !== '');
    return (
        <Container
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
                minHeight: '100vh',
                backgroundImage: `url('/Image/background.svg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                padding: '2rem',
            }}
        >
            <Card className="p-4 shadow-lg" style={{ maxWidth: '800px', width: '100%', backgroundColor: '#FF7F50', color: '#fff' }}>
                <Card.Body>
                    <h3 className="text-center mb-4">Enjoy your recipe!</h3>
                    {sentences.map((sentence, index) => (
                        <p key={index} style={{ lineHeight: '1.8', margin: '10px 0' }}>
                            {sentence.trim()}.
                        </p>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
}
