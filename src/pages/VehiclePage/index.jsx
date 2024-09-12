import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './vehiclePage.module.scss';

export default function VehiclePage() {
    const { vehicle } = useParams();
    const [vehicleData, setVehicleData] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [comments, setComments] = useState(() => {
        // Load comments from localStorage or initialize an empty array
        const savedComments = localStorage.getItem('comments');
        return savedComments ? JSON.parse(savedComments) : [];
    });

    const fetchVehicle = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${vehicle}`);
            const data = await response.json();
            setVehicleData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '' && name.trim() !== '' && surname.trim() !== '') {
            const updatedComments = [...comments, { name, surname, comment: newComment }];
            setComments(updatedComments);
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            setNewComment(''); // Clear input field
            setName('');
            setSurname('');
        }
    };

    const handleCommentChange = (e) => {
        const { value } = e.target;
        if (value.length <= 100) {
            setNewComment(value);
        }
    };

    useEffect(() => {
        if (vehicle) fetchVehicle();
    }, [vehicle]);

    return (
        <div className={styles.vehiclepage}>
            <div className="container">
                <div className={styles.vehiclepage__wrapper}>
                    <a href='/' className={styles.vehiclepage__undo}>←</a>
                    {vehicleData ? (
                        <div>
                            <h2>{vehicleData.title}</h2>
                            <img
                                src={vehicleData.images[0] || vehicleData.thumbnail}
                                alt={vehicleData.title}
                                width="300"
                            />
                            <p>{vehicleData.description}</p>
                            <p><span>Price:</span> ${vehicleData.price}</p>
                            <p><span>Rating:</span> {vehicleData.rating} / 5</p>
                            <p><span>Stock:</span> {vehicleData.stock > 0 ? "Є в наявності" : "Немає в наявності"}</p>
                            <p><span>Warranty:</span> {vehicleData.warrantyInformation}</p>

                            {vehicleData.reviews && (
                                <div>
                                    <h3>Reviews:</h3>
                                    <ul>
                                        {vehicleData.reviews.map((review, index) => (
                                            <li key={index}>
                                                <p><span>{review.reviewerName}</span> ({review.rating}/5): {review.comment}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className={styles.commentSection}>
                                <h3>Add a Comment: (All fields are required)</h3>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styles.commentInput}
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    className={styles.commentInput}
                                    placeholder="Last Name"
                                />
                                <textarea
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    className={styles.commentInput}
                                    placeholder="Write your comment here..."
                                    maxLength="100"
                                />
                                <p>{newComment.length} / 100</p>
                                <button onClick={handleAddComment} className={styles.commentButton}>
                                    Add Comment
                                </button>
                                <div className={styles.commentsList}>
                                    <h4>Comments:</h4>
                                    <ul>
                                        {comments.map((comment, index) => (
                                            <li key={index} className={styles.commentItem}>
                                                <strong>{comment.name} {comment.surname}</strong>: {comment.comment}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
