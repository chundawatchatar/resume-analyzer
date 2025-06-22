# B2B Marketplace Search (Architecture and Problem Solving)

A modern, full-stack B2B marketplace search application built with Nodejs, TypeScript, MongoDB, and llms. Features intelligent search, dynamic filtering, and category-specific facets.

## Features

- **Natural Language Search**: Full-text search across product titles and descriptions
- **Dynamic Filtering**: Category-specific filters that adapt based on search context
- **Real-time Facets**: Live filter counts that update based on current search results

## Tech Stack

- **Node.js + TypeScript** – Backend server and logic
- **MongoDB** – Primary database for structured product and category data
- **Pinecone/Qdrant (or similar)** – Vector database for semantic search and intent matching
- **LLMs via LangChain + OpenAI** – For natural language understanding and query parsing

## 🔍 Search and Autocomplete Strategy

### ✅ Autocomplete and Intent Matching

- Vector-Based Semantic Search: Autocomplete suggestions will be powered by a vector database (e.g., Qdrant) using semantic similarity. Vectors will be generated using LangChain in combination with cost-effective LLMs.
- LLM Optimization via Caching: All processed queries will be cached to reduce repeated LLM calls and improve response time.
- Rule-Based Fallback: If the ML model fails to detect user intent accurately, a rule-based fallback mechanism will be used to maintain robustness.

### 🛒 Product Storage

- **MongoDB** will be used as the primary database for product listings due to its flexible schema, which allows category-specific attributes to evolve without the need for schema migrations.

### 🔁 Query Execution Flow

1. When a user initiates a search, the query is first matched against the vector database.
2. If a match is found:
   - The corresponding pre-parsed query is retrieved from the cache and executed against MongoDB.
3. If no match is found:
   - The query is processed using an LLM via LangChain to extract structured filters.
   - This processed query is stored for future reuse.
   - The same query is then executed against MongoDB, and the results are returned to the user.
