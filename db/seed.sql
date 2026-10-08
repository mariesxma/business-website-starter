INSERT INTO resources (id,title,description,published) VALUES
(1,'Sample project checklist','A fictional resource for demonstrating the catalogue.',1),
(2,'Sample handover guide','Replace this item with your own public resource.',1),
(3,'Unpublished example','This record must not appear in the public API.',0)
ON CONFLICT(id) DO NOTHING;
