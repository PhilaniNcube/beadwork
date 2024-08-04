/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DrDx1xz1TbK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from "@/components/ui/pagination";
import { max } from "date-fns";

export default function PaginationComponent({
	page,
	maxPages,
	count,
	href,
}: { href: string; page: number; maxPages: number; count: number }) {


	return (
		<Pagination className="flex justify-start">
			<PaginationContent>
				{page > 1 ? (
					<PaginationItem>
						<PaginationPrevious href={`${href}?page=${page - 1}`} />
					</PaginationItem>
				) : null}

				<PaginationItem>
					<PaginationLink href={`${href}?page=${1}`}>1</PaginationLink>
				</PaginationItem>
				{maxPages === 2 ? (
					<PaginationItem>
						<PaginationLink href={`${href}?page=${2}`}>2</PaginationLink>
					</PaginationItem>
				) : null}
				{maxPages === 3 ? (
					<PaginationItem>
						<PaginationLink href={`${href}?page=${3}`}>3</PaginationLink>
					</PaginationItem>
				) : null}
				{maxPages === 4 ? (
					<PaginationItem>
						<PaginationLink href={`${href}?page=${4}`}>4</PaginationLink>
					</PaginationItem>
				) : null}

				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				{page < maxPages ? (
					<PaginationItem>
						<PaginationNext href={`${href}?page=${page+1}`} />
					</PaginationItem>
				) : null}
			</PaginationContent>
		</Pagination>
	);
}
