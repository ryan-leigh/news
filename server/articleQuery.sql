SELECT articles.id, headline, image_url, summary, publishers.name
FROM users
JOIN topic_subscriptions ON users.id = topic_subscriptions.user_id
JOIN publisher_subscriptions ON users.id = publisher_subscriptions.user_id
JOIN topics ON topic_subscriptions.topic_id = topics.id
JOIN publishers ON publisher_subscriptions.publisher_id = publishers.id
JOIN articles ON articles.topic_name = topics.name AND articles.publisher_name = publishers.name;