using System.ComponentModel.DataAnnotations;

public class UpdateQuestionOrderDTO
{
    [Required]
    public List<QuestionExamOrderDTO> QuestionExamOrderDTOs { get; set; } = new List<QuestionExamOrderDTO>();
}