import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const App = () => {
const [feedback, setFeedback] = useState({
good: 0,
neutral: 0,
bad: 0,
});

const handleLeaveFeedback = option => {
setFeedback(prevFeedback => ({
...prevFeedback,
[option]: prevFeedback[option] + 1,
}));
};

const countTotalFeedback = () => {
const { good, neutral, bad } = feedback;
return good + neutral + bad;
};

const countPositiveFeedbackPercentage = () => {
const { good } = feedback;
const total = countTotalFeedback();
return total === 0 ? 0 : Math.round((good / total) * 100);
};

const total = countTotalFeedback();
const positivePercentage = countPositiveFeedbackPercentage();

return (
<div>
<Section title="Please leave feedback">
<FeedbackOptions
       options={Object.keys(feedback)}
       onLeaveFeedback={handleLeaveFeedback}
     />
</Section>
{total ? (
<Section title="Statistics">
<Statistics
         good={feedback.good}
         neutral={feedback.neutral}
         bad={feedback.bad}
         total={total}
         positivePercentage={positivePercentage}
       />
</Section>
) : (
<Notification message="There is no feedback" />
)}
</div>
);
};

export default App;