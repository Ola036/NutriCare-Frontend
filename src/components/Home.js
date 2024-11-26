import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ENDPOINTS } from '../config/constants'

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');

  const handleGenerateRecipe = () => {
    if (!ingredients.trim()) {
      setError('Ingredients field is required.');
      return;
    }

    // Clear previous error
    setError(null);

    // Send data to the API
    const requestBody = {
      ingredients,
      calories: calories || null, // Include calories only if provided
      health_condition: user?.health_condition, // Retrieved from profile
      dietary_preferences: user?.dietary_preferences, // Retrieved from profile
    };

    console.log('Request Payload:', requestBody);

    api({
      url: ENDPOINTS.RECIPES.GENERATE,
      method: 'POST',
      body: requestBody,
      onSuccess: (data) => {
        console.log('Generated Recipe:', data);
        navigate('/recipes', { state: { recipe: data.response || 'Recipe generation failed.' } }); // Navigate to Recipes page
      },
      onError: (errors) => {
        setError(errors.message || 'Failed to generate the recipe.');
      },
    });
  };

  return (
     <div style={{    
      minHeight: '100vh',
      backgroundImage: `url('/Image/background.svg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
    }}>

    <Container
      className="d-flex flex-column align-items-center justify-content-center"
    >

      {/* Welcome Section */}
      <div style={{ marginBottom: '50px' }}>
        <h1 className="display-4" style={{ color: 'white', fontWeight: 'bold' }}>
          Welcome, {user?.name}!
        </h1>
        <p style={{ color: 'white', fontSize: '20px', fontWeight: '500' }}>
          Generate your personalized recipe now.
        </p>
      </div>
        <Row className="justify-content-center">
          <Col md={7}>
            <Form>
              <Row className="mb-3">
                {/* Ingredients Field */}
              <Col md={10} style={{ marginBottom: '15px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Enter ingredients (e.g., chicken, rice)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    style={{
                      width: '145%', // Make it occupy the full width of its column
                      padding: '10px', // Add some padding for better UX
                      borderRadius: '5px',
                    }}
                  />
                </Col>

                {/* Calories Field */}
                <Col md={7}>
                  <Form.Control
                    type="text"
                    placeholder="Enter calories (optional)"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    style={{
                      width: '145%', // Make it occupy the full width of its column
                      padding: '10px', // Add some padding for better UX
                      borderRadius: '5px',
                    }}
                  />
                </Col>
              </Row>

            {/* Display the error message */}
            {error && (
              <Row className="mb-3">
                <Col>
                  <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                </Col>
              </Row>
            )}
            
              <Row className="text-center">
                {/* Generate Recipe Button */}
                <Button
                  onClick={handleGenerateRecipe}
                  style={{
                    backgroundColor: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                  }}
                >
                  Generate Recipe
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
