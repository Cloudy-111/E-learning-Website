import ReviewItem from './ReviewItem'

function ListReview({ listReview = [] }) {
    if (!Array.isArray(listReview) || listReview.length === 0) {
        return (
            <div className="lg:col-span-2 rounded-2xl border p-4 bg-white">
                <p className="text-slate-600">Chưa có nhận xét nào.</p>
            </div>
        )
    }

    return (
        <div className="lg:col-span-2 rounded-2xl border bg-white">
            {listReview.map((review, idx) => (
                <ReviewItem key={review.id ?? idx} review={review} />
            ))}
        </div>
    )
}

export default ListReview