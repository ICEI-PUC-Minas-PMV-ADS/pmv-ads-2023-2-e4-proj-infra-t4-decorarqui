using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace decorArqui.Models
{
    public class Entity
    {
        public Entity()
        {
            SetCreatedAt();
            SetUpdatedAt();
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime UpdatedAt { get; set; }

        [BsonIgnore]
        public bool IsNew => string.IsNullOrEmpty(Id);

        [BsonIgnore]
        public bool IsModified { get; set; }

        public void SetCreatedAt()
        {
            if (IsNew)
            {
                CreatedAt = DateTime.UtcNow;
            }
        }

        public void SetUpdatedAt()
        {
            UpdatedAt = DateTime.UtcNow;
        }

    }
}

