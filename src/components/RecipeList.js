import React, { useState, useEffect } from 'react';
import { Container, Card, Dropdown } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons
import axios from 'axios';
import { ENDPOINTS } from '../config/constants';
import { useUser } from '../contexts/UserContext';

export default function RecipeList() {
    const { user } = useUser();
    const [recipes, setRecipes] = useState([]);
    const [filter, setFilter] = useState('all'); // all, favorites, unfavorites

    // Fetch recipes from the backend
    useEffect(() => {
        async function fetchRecipes() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(ENDPOINTS.RECIPES.GENERATE, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }
        fetchRecipes();
    }, []);

    // Toggle favorite
    async function toggleFavorite(recipe) {
        try {
            const token = localStorage.getItem('token');
            const endpoint = recipe.favorite
                ? `${ENDPOINTS.RECIPES.GENERATE}/${recipe.id}/unfavorite`
                : `${ENDPOINTS.RECIPES.GENERATE}/${recipe.id}/favorite`;

            await axios.post(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });

            // Update the local state
            setRecipes((prev) =>
                prev.map((r) => (r.id === recipe.id ? { ...r, favorite: !r.favorite } : r))
            );
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    // Filter recipes
    const filteredRecipes = recipes.filter((recipe) => {
        if (filter === 'favorites') return recipe.favorite;
        if (filter === 'unfavorites') return !recipe.favorite;
        return true; // For 'all'
    });

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundImage: `url('/Image/background.svg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                padding: '2rem',
            }}
        >
            <Container>
                <h2 className="mb-4 text-white">Your Recipes</h2>
                <Dropdown className="mb-4">
                    <Dropdown.Toggle variant="light" id="filter-dropdown">
                        Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setFilter('all')}>All Recipes</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('favorites')}>Favorites</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('unfavorites')}>Unfavorites</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="d-flex flex-wrap justify-content-start">
                    {filteredRecipes.map((recipe) => (
                        <Card
                            key={recipe.id}
                            style={{
                                width: '18rem',
                                margin: '1rem',
                                backgroundColor: '#EB5406',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <Card.Body>
                                <Card.Title style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {recipe.ingredients}
                                </Card.Title>
                                <Card.Text
                                    style={{
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    {recipe.response}
                                </Card.Text>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '1.5rem',
                                            color: '#ffffff',
                                        }}
                                        onClick={() => toggleFavorite(recipe)}
                                    >
                                        {recipe.favorite ? <FaHeart /> : <FaRegHeart />}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
    );
}
