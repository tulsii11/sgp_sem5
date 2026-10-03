import os

import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

from preprocessing import load_data
from preprocessing import prepare_data
from preprocessing import create_preprocessor


# --------------------------------------------------
# PATHS
# --------------------------------------------------

DATA_PATH = os.path.join(
    "ml",
    "data",
    "indian_engineering_placement_2026.csv"
)

MODEL_FOLDER = os.path.join(
    "ml",
    "models"
)

os.makedirs(MODEL_FOLDER, exist_ok=True)


# --------------------------------------------------
# LOAD DATA
# --------------------------------------------------

print("=" * 70)
print("LOADING DATASET")
print("=" * 70)

df = load_data(DATA_PATH)

print("Dataset shape:", df.shape)


# --------------------------------------------------
# PREPARE DATA
# --------------------------------------------------

X, y = prepare_data(df)

print("\nFeatures:", X.shape)
print("Target:", y.shape)

print("\nTarget distribution:")
print(y.value_counts())


# --------------------------------------------------
# TRAIN / TEST SPLIT
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining rows:", len(X_train))
print("Testing rows:", len(X_test))


# --------------------------------------------------
# PREPROCESSOR
# --------------------------------------------------

preprocessor = create_preprocessor(X)


# --------------------------------------------------
# MODELS
# --------------------------------------------------

models = {
    "Logistic Regression": LogisticRegression(
        max_iter=2000,
        random_state=42
    ),

    "Decision Tree": DecisionTreeClassifier(
        random_state=42,
        max_depth=8
    ),

    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        n_jobs=-1
    ),

    "Gradient Boosting": GradientBoostingClassifier(
        random_state=42,
        n_estimators=150
    )
}


# --------------------------------------------------
# TRAIN AND EVALUATE
# --------------------------------------------------

results = []

trained_models = {}

for model_name, model in models.items():

    print("\n" + "=" * 70)
    print(model_name)
    print("=" * 70)

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", model)
        ]
    )

    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    precision = precision_score(
        y_test,
        predictions,
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        zero_division=0
    )

    print("Accuracy :", round(accuracy, 4))
    print("Precision:", round(precision, 4))
    print("Recall   :", round(recall, 4))
    print("F1 Score :", round(f1, 4))

    results.append({
        "Model": model_name,
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1 Score": f1
    })

    trained_models[model_name] = pipeline


# --------------------------------------------------
# RESULTS
# --------------------------------------------------

print("\n" + "=" * 70)
print("MODEL COMPARISON")
print("=" * 70)

results_df = __import__("pandas").DataFrame(results)

print(
    results_df
    .sort_values("F1 Score", ascending=False)
    .to_string(index=False)
)


# --------------------------------------------------
# SELECT BEST MODEL
# --------------------------------------------------

best_model_name = (
    results_df
    .sort_values("F1 Score", ascending=False)
    .iloc[0]["Model"]
)

best_model = trained_models[best_model_name]

print("\nBest model:", best_model_name)


# --------------------------------------------------
# SAVE MODEL
# --------------------------------------------------

model_path = os.path.join(
    MODEL_FOLDER,
    "placement_model.joblib"
)

joblib.dump(
    best_model,
    model_path
)

print("\nSaved model:")
print(model_path)

print("\nTraining completed successfully.")