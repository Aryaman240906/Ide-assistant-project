from neo4j import GraphDatabase
from datetime import datetime

# Neo4j connection URI and credentials
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "neo4j123"

# Driver instance
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def test_connection():
    """
    Runs a simple query to verify the Neo4j connection.
    """
    with driver.session() as session:
        result = session.run("RETURN 'Neo4j connection successful!' AS message")
        for record in result:
            print(record["message"])

def save_message_to_neo4j(message_text: str, source: str = "user"):
    """
    Creates a Message node in Neo4j with text, source, and timestamp.
    """
    timestamp = datetime.utcnow().isoformat()

    with driver.session() as session:
        session.run(
            """
            CREATE (m:Message {
                text: $text,
                source: $source,
                timestamp: $timestamp
            })
            """,
            text=message_text,
            source=source,
            timestamp=timestamp,
        )