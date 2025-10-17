public class UpdateQuestionOrderDTO
{
    public string ExamId { get; set; } = null!;
    public List<QuestionExamOrderDTO> QuestionExamOrderDTOs { get; set; } = new List<QuestionExamOrderDTO>();
}