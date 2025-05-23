# Multi-Model Chatbot API Documentation

This backend provides access to multiple large language models (LLMs) via a REST API. You can interact with all models at once or with each model individually.

---

## 🚦 Endpoints Overview

| Endpoint         | Description                                      | Model(s) Used           |
|------------------|--------------------------------------------------|-------------------------|
| `/api/chat`      | Get answers from all models + dataset match      | LLaMA 3, Mixtral, TinyLLaMA, Dataset |
| `/api/llama3`    | Get answer from LLaMA 3 (Groq) only              | LLaMA 3 (Groq)          |
| `/api/mixtral`   | Get answer from Mixtral (Groq) only              | Mixtral (Groq)          |
| `/api/tinyllama` | Get answer from TinyLLaMA (local) only           | TinyLLaMA (local)       |

---

## 📝 Request Format

All endpoints accept a POST request with a JSON body:

```json
{
  "input": "Your question here"
}
```

---

## 🧑‍💻 `/api/chat` — Multi-Model Endpoint

**Description:**  
Returns answers from all models (LLaMA 3, Mixtral, TinyLLaMA) and the dataset match (if any).

**Request:**
```http
POST /api/chat
Content-Type: application/json

{
  "input": "What is insurance?"
}
```

**Response:**
```json
{
  "dataset_match": true,
  "dataset": {
    "success": true,
    "response": "Dataset answer if found",
    "intent": "intent label",
    "source": "bert or tfidf",
    "model": "Dataset Match"
  },
  "models": {
    "llama3": {
      "success": true,
      "response": "LLaMA 3's answer",
      "model": "llama3-70b-8192"
    },
    "mixtral": {
      "success": true,
      "response": "Mixtral's answer",
      "model": "mistral-saba-24b"
    },
    "tinyllama": {
      "success": true,
      "response": "TinyLLaMA's answer",
      "model": "TinyLLaMA"
    }
  },
  "success": true
}
```

- If there is **no dataset match**, `"dataset_match": false` and `"dataset": null`.
- If a model fails, its `success` will be `false` and an `error` field will be present.

---

## 🤖 `/api/llama3` — LLaMA 3 (Groq) Only

**Request:**
```http
POST /api/llama3
Content-Type: application/json

{
  "input": "What is insurance?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "LLaMA 3's answer",
  "model": "llama3-70b-8192"
}
```
- If the model fails, `success` will be `false` and an `error` field will be present.

---

## 🤖 `/api/mixtral` — Mixtral (Groq) Only

**Request:**
```http
POST /api/mixtral
Content-Type: application/json

{
  "input": "What is insurance?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Mixtral's answer",
  "model": "mistral-saba-24b"
}
```
- If the model fails, `success` will be `false` and an `error` field will be present.

---

## 🤖 `/api/tinyllama` — TinyLLaMA (Local) Only

**Request:**
```http
POST /api/tinyllama
Content-Type: application/json

{
  "input": "What is insurance?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "TinyLLaMA's answer",
  "model": "TinyLLaMA"
}
```
- If the model fails, `success` will be `false` and an `error` field will be present.

---

## 🟢 Dataset Match

- If the user's question matches an entry in the dataset, the dataset answer is included in the `/api/chat` response under the `dataset` key.
- The `intent` and `source` fields provide additional context.

---

## 🛑 Error Handling

- If a model fails, its response will look like:
  ```json
  {
    "success": false,
    "error": "Error message here",
    "model": "llama3-70b-8192"
  }
  ```
- The frontend should display the error message for that model.

---

## 💡 UI/UX Suggestions

- Show all model answers side by side for `/api/chat`.
- Clearly label each model's answer.
- Show the dataset match (if present) in a separate card/section.
- Display error messages if any model fails.
- Allow users to select which model to chat with individually.

---

## 🔗 Example curl Commands

```bash
# All models
curl --location 'http://localhost:5000/api/chat' \
--header 'Content-Type: application/json' \
--data '{"input": "What is insurance?"}'

# LLaMA 3 only
curl --location 'http://localhost:5000/api/llama3' \
--header 'Content-Type: application/json' \
--data '{"input": "What is insurance?"}'

# Mixtral only
curl --location 'http://localhost:5000/api/mixtral' \
--header 'Content-Type: application/json' \
--data '{"input": "What is insurance?"}'

# TinyLLaMA only
curl --location 'http://localhost:5000/api/tinyllama' \
--header 'Content-Type: application/json' \
--data '{"input": "What is insurance?"}'
```

---

## 🛠️ Notes

- All endpoints expect and return JSON.
- The backend will always try to return a response from each model, even if some fail.
- For best performance, use the `/api/chat` endpoint for multi-model comparison, and the individual endpoints for focused interaction.

---

**For any questions or further integration help, contact the backend team!** 
