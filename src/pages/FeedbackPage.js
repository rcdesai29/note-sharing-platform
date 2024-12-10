import React from 'react';

const Feedback = () => {
  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const message = event.target.message.value;

    try {
      const response = await fetch('http://localhost:5001/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        alert('Feedback Submitted Successfully');
      } else {
        alert('Error Submitting Feedback1');
      }
    } catch (error) {
      alert('Error Submitting Feedback2');
    }
  };

  return (
    <div>
      <h3>Feedback</h3>
      <form onSubmit={handleFeedbackSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="message">Message: </label>
        <textarea id="message" name="message" required></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Feedback;