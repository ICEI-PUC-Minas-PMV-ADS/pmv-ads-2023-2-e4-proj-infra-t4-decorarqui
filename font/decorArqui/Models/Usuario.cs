﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace decorArqui.Models
{
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [Display(Name = "Nome")]
        public string? Nome { get; set; }
        
        [Display(Name = "Email")]
        public string? Email { get; set; }
        
        [Display(Name = "Senha")]
        [DataType(DataType.Password)]
        public string? Senha { get; set; }

        [Display(Name = "Tipo")]
        public string? Tipo { get; set; }
    }

    public class Cliente : Usuario
    {
        [Display(Name = "Descricao")]
        public string? Descricao { get; set; }


        [Display(Name = "Preco")]
        public double? Preco { get; set; }

        public string[]? ListaDeFavoritos { get; set; }
    }

    public class Arquiteto : Usuario
    {
        [Display(Name = "Instituicao")]
        public string? Instituicao { get; set; }

        [Display(Name = "Cursos")]
        public string? Cursos { get; set; }

        [Display(Name = "ResumoProfissional")]
        public string? ResumoProfissional { get; set; }

        public bool AceiteProposta { get; set; }

        public string? PropostaId { get; set; }
    }

    public class  Loja : Usuario 
    {
        
    }

}