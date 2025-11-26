import { Course, User, Review, Progress } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Student',
    email: 'alex@lms.com',
    password: 'JaiShreeram',
    role: 'STUDENT',
    avatar: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: 'm1',
    name: 'Sarah Mentor',
    email: 'sarah@lms.com',
    password: 'JaiShreeram',
    role: 'MENTOR',
    avatar: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@lms.com',
    password: 'JaiShreeram',
    role: 'ADMIN',
    avatar: 'https://picsum.photos/200/200?random=3'
  }
];

export const MOCK_COURSE: Course = {
  id: 'c_ai_eng_01',
  title: 'AI Engineer Career Path',
  description: 'A comprehensive step-by-step guide to becoming an AI Engineer. From Python basics to Deep Learning, GenAI, and MLOps deployment.',
  modules: [
    {
      id: 'm1',
      title: 'Python for AI & Data Preprocessing',
      description: 'Basics of Python, Numpy, Pandas, Matplotlib, Scikit-Learn. Handling missing values, outliers, scaling, and encoding.',
      estimatedTime: '2 Weeks',
      tags: ['Basic', 'Python', 'Preprocessing'],
      contents: [
        {
          id: 'm1_c1',
          type: 'THEORY',
          title: 'Foundations & Resources',
          content: `Welcome to your journey to becoming an AI Engineer. This module covers the absolute essentials.

**Key Topics:**
1. **Python Basics**: Syntax, loops, functions.
2. **Numpy & Pandas**: The engines of data manipulation.
3. **Matplotlib**: Basic plotting.
4. **Scikit-Learn**: The gold standard for classical ML.
5. **Preprocessing**: Cleaning data, removing outliers, scaling features (StandardScaler/MinMax), and encoding categorical variables (OneHot/Label).

**Study Resources (Click to open):**
https://www.w3schools.com/python/
https://numpy.org/doc/stable/user/absolute_beginners.html
https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html
https://matplotlib.org/stable/tutorials/
https://scikit-learn.org/stable/tutorial/basic/tutorial.html
https://www.kaggle.com/learn/data-cleaning
https://scikit-learn.org/stable/modules/preprocessing.html
https://seaborn.pydata.org/tutorial/distributions.html`
        },
        {
          id: 'm1_c2',
          type: 'CODE',
          title: 'Practice: Cleaning Data',
          content: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Scenario: You have a raw dataset with missing values and different scales.
# Task: 
# 1. Fill missing 'age' with the mean.
# 2. Scale the 'salary' column using StandardScaler.

def clean_and_scale():
    df = pd.DataFrame({
        'name': ['Alice', 'Bob', 'Charlie', 'David'],
        'age': [25, np.nan, 30, 22],
        'salary': [50000, 60000, 55000, 45000]
    })
    
    # Write your code here
    # df['age'] = ...
    # scaler = ...
    # df['salary'] = ...
    
    print("Cleaned Data:")
    print(df)

clean_and_scale()`
        },
        {
          id: 'm1_c3',
          type: 'QUIZ',
          title: 'Preprocessing Knowledge Check',
          content: 'Verify your understanding of data cleaning.',
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              text: 'Which technique is best for handling outliers in a dataset that is normally distributed?',
              options: ['Z-Score method', 'Removing all data', 'Multiplying by zero', 'One Hot Encoding'],
              correctOptionIndex: 0
            },
            {
              id: 'q2',
              text: 'What does One-Hot Encoding do?',
              options: ['Converts text to lower case', 'Converts categorical variables into binary columns', 'Removes missing values', 'Scales numbers between 0 and 1'],
              correctOptionIndex: 1
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      title: 'Project 1: Student Score Predictor',
      description: 'Apply your Python and Data Handling skills to build a simple predictor.',
      estimatedTime: '1 Week',
      tags: ['Project', 'Basic'],
      contents: [
        {
          id: 'm2_c1',
          type: 'THEORY',
          title: 'Project Brief',
          content: `**Goal:** Build a simple function that predicts student scores based on hours studied.

**Requirements:**
1. Create a synthetic dataset or use lists.
2. Calculate the correlation between hours and scores manually or visually.
3. Create a simple logic (e.g., linear formula y = mx + c) to predict the score.

This project validates your ability to handle data structures in Python.`
        },
        {
          id: 'm2_c2',
          type: 'CODE',
          title: 'Code Solution',
          content: `import numpy as np

def predict_score_project():
    # Synthetic Data
    hours = np.array([1, 2, 3, 4, 5])
    scores = np.array([10, 20, 30, 40, 50])
    
    # Task: Write a function that takes 'h' (hours) and returns predicted score
    # Based on the pattern above, Score = 10 * Hours
    
    def predictor(h):
        return h * 10
        
    test_hour = 7
    print(f"Prediction for {test_hour} hours: {predictor(test_hour)}")

predict_score_project()`
        }
      ]
    },
    {
      id: 'm3',
      title: 'EDA & Visualization',
      description: 'Exploratory Data Analysis on Sales Data using Matplotlib & Seaborn.',
      estimatedTime: '1 Week',
      tags: ['Visualization', 'Basic-Intermediate'],
      contents: [
        {
          id: 'm3_c1',
          type: 'THEORY',
          title: 'Visualizing Trends',
          content: `Data Visualization is how we communicate insights.

**Key Libraries:**
- **Matplotlib**: Low-level control.
- **Seaborn**: High-level statistical graphics.

**Learning Resources:**
https://www.kaggle.com/learn/pandas
https://seaborn.pydata.org/tutorial.html
https://www.analyticsvidhya.com/blog/2016/01/guide-data-exploration/

**Focus Areas:**
1. Histograms (Distribution)
2. Scatter Plots (Relationships)
3. Heatmaps (Correlation)`
        },
        {
           id: 'm3_c2',
           type: 'CODE',
           title: 'Plotting Exercise',
           content: `import matplotlib.pyplot as plt
import pandas as pd

# Mock Sales Data
data = {'Month': ['Jan', 'Feb', 'Mar', 'Apr'], 'Sales': [100, 150, 130, 200]}
df = pd.DataFrame(data)

# Task: Create a Bar Chart for the sales data
# plt.bar(...)
# plt.title('Monthly Sales')
# plt.show()
print("Code ready to run...")`
        }
      ]
    },
    {
      id: 'm4',
      title: 'Machine Learning Fundamentals',
      description: 'Supervised vs Unsupervised, Regression, KNN, Trees, Forests, Metrics.',
      estimatedTime: '1 Week',
      tags: ['ML', 'Intermediate'],
      contents: [
        {
          id: 'm4_c1',
          type: 'THEORY',
          title: 'Core Algorithms',
          content: `This module dives into the math and logic of ML.

**Topics:**
- **Supervised**: Linear/Logistic Regression, Decision Trees, Random Forests.
- **Unsupervised**: K-Means Clustering, PCA.
- **Evaluation**: Accuracy, Precision, Recall, F1-Score, RMSE.

**Learning Resources:**
https://developers.google.com/machine-learning/crash-course
https://scikit-learn.org/stable/supervised_learning.html
https://www.analyticsvidhya.com/blog/2021/06/top-classification-algorithms/
https://scikit-learn.org/stable/modules/model_evaluation.html`
        },
        {
          id: 'm4_c2',
          type: 'QUIZ',
          title: 'ML Quiz',
          content: 'Test your grasp of ML algorithms.',
          passingScore: 60,
          questions: [
            {
              id: 'm4_q1',
              text: 'Which metric is best for imbalanced classification problems?',
              options: ['Accuracy', 'F1-Score', 'Mean Squared Error', 'R-Squared'],
              correctOptionIndex: 1
            },
            {
              id: 'm4_q2',
              text: 'Random Forest is an example of what technique?',
              options: ['Ensemble Learning (Bagging)', 'Boosting', 'Clustering', 'Dimensionality Reduction'],
              correctOptionIndex: 0
            }
          ]
        }
      ]
    },
    {
      id: 'm5',
      title: 'Feature Engineering & Model Optimization',
      description: 'Selection, Regularization (L1/L2), GridSearchCV, Hyperparameter Tuning.',
      estimatedTime: '2 Weeks',
      tags: ['Optimization', 'Intermediate'],
      contents: [
        {
            id: 'm5_c1',
            type: 'THEORY',
            title: 'Refining Models',
            content: `A model is only as good as its features and settings.

**Key Concepts:**
- **L1/L2 Regularization (Lasso/Ridge)**: Prevents overfitting.
- **GridSearchCV**: Brute-force checking all hyperparameter combinations.
- **Cross Validation**: Ensuring your model generalizes to unseen data (K-Fold).

**Learning Resources:**
https://www.kaggle.com/learn/feature-engineering
https://scikit-learn.org/stable/modules/linear_model.html#lasso-l1
https://scikit-learn.org/stable/modules/grid_search.html
https://scikit-learn.org/stable/modules/cross_validation.html`
        },
        {
          id: 'm5_c2',
          type: 'CODE',
          title: 'Grid Search Implementation',
          content: `from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC

# Pseudo-code for Grid Search
# param_grid = {'C': [0.1, 1, 10], 'gamma': [1, 0.1, 0.01]}
# grid = GridSearchCV(SVC(), param_grid, refit=True)
# grid.fit(X_train, y_train)
# print(grid.best_params_)

print("Understand the logic above to find the best model settings.")`
        }
      ]
    },
    {
      id: 'm6',
      title: 'Project 2: ML Application',
      description: 'Apply ML fundamentals to a dataset (Regression/Classification).',
      estimatedTime: '1 Week',
      tags: ['Project', 'Intermediate'],
      contents: [
        {
          id: 'm6_c1',
          type: 'THEORY',
          title: 'Project Brief',
          content: `**Task:** Pick a dataset (e.g., Titanic, Iris, or Housing Prices).
1. Preprocess the data (handle nulls, scale).
2. Train a Decision Tree and a Random Forest.
3. Compare their accuracy/RMSE.
4. Report which model performed better.`
        },
        {
            id: 'm6_c2',
            type: 'CODE',
            title: 'Starter Code',
            content: `# Import necessary libraries
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

def run_project():
    # Load Data
    data = load_iris()
    X, y = data.data, data.target
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # Train
    model = RandomForestClassifier()
    model.fit(X_train, y_train)
    
    # Evaluate
    preds = model.predict(X_test)
    print(f"Accuracy: {accuracy_score(y_test, preds)}")

run_project()`
        }
      ]
    },
    {
      id: 'm7',
      title: 'Deep Learning Basics',
      description: 'Neural Networks (TensorFlow/Keras), Backprop, CNNs basics.',
      estimatedTime: '1 Week',
      tags: ['DL', 'Intermediate'],
      contents: [
        {
          id: 'm7_c1',
          type: 'THEORY',
          title: 'Neural Networks',
          content: `Transitioning from classical ML to Deep Learning.

**Concepts:**
- **Neurons & Layers**: The building blocks.
- **Activation Functions**: ReLU, Sigmoid, Softmax.
- **CNNs**: Convolutional Neural Networks for image processing.

**Learning Resources:**
https://www.tensorflow.org/tutorials/quickstart/beginner
https://www.tensorflow.org/guide/keras/sequential_model
https://www.tensorflow.org/tutorials/images/cnn`
        },
        {
          id: 'm7_c2',
          type: 'CODE',
          title: 'Keras Model Structure',
          content: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten

# Task: Define a simple model architecture
def create_model():
    model = Sequential([
        Flatten(input_shape=(28, 28)),    # Input Layer (e.g. MNIST)
        Dense(128, activation='relu'),    # Hidden Layer
        Dense(10, activation='softmax')   # Output Layer
    ])
    
    # model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

print("Model function defined.")`
        }
      ]
    },
    {
      id: 'm8',
      title: 'NLP & GenAI Intro',
      description: 'Transformers (BERT/GPT), Tokenization, Word2Vec, Prompt Engineering.',
      estimatedTime: '2 Weeks',
      tags: ['NLP', 'GenAI', 'Advanced'],
      contents: [
        {
          id: 'm8_c1',
          type: 'THEORY',
          title: 'Modern NLP',
          content: `Natural Language Processing has been revolutionized by Transformers.

**Topics:**
- **Embeddings**: Word2Vec, TF-IDF.
- **Transformers**: Self-Attention mechanisms (BERT, GPT).
- **Prompt Engineering**: Designing inputs to guide LLMs.

**Learning Resources:**
https://www.kaggle.com/learn/natural-language-processing
https://radimrehurek.com/gensim/models/word2vec.html
https://huggingface.co/learn/nlp-course/
https://platform.openai.com/docs/guides/prompt-engineering`
        },
        {
          id: 'm8_c2',
          type: 'QUIZ',
          title: 'GenAI Check',
          content: 'Understanding LLMs and Prompting.',
          passingScore: 60,
          questions: [
            {
              id: 'm8_q1',
              text: 'What is the main innovation of the Transformer architecture?',
              options: ['Self-Attention Mechanism', 'Convolutional Layers', 'Recurrent Loops', 'Random Forest'],
              correctOptionIndex: 0
            },
            {
              id: 'm8_q2',
              text: 'Which is a technique to improve LLM outputs without retraining?',
              options: ['Prompt Engineering / Few-Shot Learning', 'Deleting the model', 'Changing the GPU', 'Using a smaller dataset'],
              correctOptionIndex: 0
            }
          ]
        }
      ]
    },
    {
      id: 'm9',
      title: 'Project 3: Sentiment Analysis',
      description: 'Customer Segmentation or Sentiment Analysis using simple NLP/DL.',
      estimatedTime: '1 Week',
      tags: ['Project', 'NLP'],
      contents: [
        {
          id: 'm9_c1',
          type: 'CODE',
          title: 'Sentiment Logic',
          content: `# Mocking a sentiment analysis workflow
def analyze_sentiment(text):
    positive_words = ['good', 'great', 'excellent', 'love']
    negative_words = ['bad', 'poor', 'terrible', 'hate']
    
    score = 0
    for word in text.split():
        if word.lower() in positive_words:
            score += 1
        elif word.lower() in negative_words:
            score -= 1
            
    if score > 0: return "POSITIVE"
    if score < 0: return "NEGATIVE"
    return "NEUTRAL"

print(analyze_sentiment("This course is great but the homework is bad"))`
        }
      ]
    },
    {
      id: 'm10',
      title: 'Advanced DL & Deployment Essentials',
      description: 'RNN/LSTM, Transfer Learning, RAG + Vector DB (FAISS), FastAPI Deployment.',
      estimatedTime: '2 Weeks',
      tags: ['Advanced', 'Deployment', 'RAG'],
      contents: [
        {
          id: 'm10_c1',
          type: 'THEORY',
          title: 'Production AI',
          content: `Building models is half the battle. Deploying them is the other half.

**Topics:**
- **RAG (Retrieval Augmented Generation)**: Combining LLMs with your own data using Vector DBs (FAISS/Chroma).
- **FastAPI**: Creating high-performance APIs for your models.
- **Docker**: Containerizing your application.

**Learning Resources:**
https://www.tensorflow.org/guide/keras/rnn
https://www.tensorflow.org/tutorials/images/transfer_learning
https://huggingface.co/docs/transformers/main/en/tasks/retrieval
https://fastapi.tiangolo.com/tutorial/
https://docs.docker.com/get-started/`
        },
        {
          id: 'm10_c2',
          type: 'CODE',
          title: 'FastAPI Mock',
          content: `# Concepts for a FastAPI app
# from fastapi import FastAPI
# app = FastAPI()

# @app.post("/predict")
# def predict(data: dict):
#     prediction = model.predict(data['input'])
#     return {"result": prediction}

print("Learn FastAPI to serve your models to the world.")`
        }
      ]
    },
    {
      id: 'm11',
      title: 'Capstone Integration',
      description: 'End-to-end AI system: Data -> Model -> API Deployment.',
      estimatedTime: '3 Weeks',
      tags: ['Capstone', 'Advanced'],
      contents: [
        {
          id: 'm11_c1',
          type: 'THEORY',
          title: 'Final Certification Task',
          content: `To become a Certified AI Engineer, you must complete this Capstone.

**Task:** Build a full AI system.
1. Ingest real-world data.
2. Train a robust model (or use an LLM with RAG).
3. Wrap it in a FastAPI.
4. Dockerize the solution.

**Resources:**
https://www.kaggle.com/code/soham1998/mlops-end-to-end-ml-project
https://youtu.be/0sOvCWFmrtA
https://huggingface.co/blog/how-to-build-a-state-of-the-art-chatbot

Once complete, verify all your modules are marked as done to generate your certificate.`
        }
      ]
    }
  ]
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    moduleId: 'm1',
    userId: 'u1',
    userName: 'Alex Student',
    rating: 5,
    text: 'The roadmap provided in this course is exactly what I needed. The links to external resources save so much time.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const INITIAL_PROGRESS: Progress[] = [
  {
    moduleId: 'm1',
    userId: 'u1',
    status: 'IN_PROGRESS',
    completedContents: ['m1_c1'],
  }
];