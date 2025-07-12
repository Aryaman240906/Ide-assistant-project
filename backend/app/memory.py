from neo4j import GraphDatabase

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
